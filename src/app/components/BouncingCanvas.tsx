'use client';
import React, { useEffect, useRef } from 'react';

/**
 * A draggable and bouncing canvas component with customizable drawing logic.
 * @param {object} props - The component props.
 * @param {React.RefObject<HTMLElement>} [props.boundaryRef] - A ref to the element that defines the boundaries for the canvas. If not provided, the window will be used as the boundary.
 * @param {(context: CanvasRenderingContext2D, width: number, height: number) => void} [props.drawFunc] - A function to draw the content on the canvas.
 * @param {string} [props.backgroundColor] - The background color of the canvas.
 */
interface BouncingCanvasProps {
  boundaryRef?: React.RefObject<HTMLElement | null>;
  drawFunc?: (context: CanvasRenderingContext2D, width: number, height: number) => void;
  backgroundColor?: string;
  initialPosition?: {x: number, y: number}
}

/**
 * A draggable and bouncing canvas component with customizable drawing logic.
 * @param {object} props - The component props.
 * @param {React.RefObject<HTMLElement>} [props.boundaryRef] - A ref to the element that defines the boundaries for the canvas. If not provided, the window will be used as the boundary.
 * @param {(context: CanvasRenderingContext2D, width: number, height: number) => void} [props.drawFunc] - A function to draw the content on the canvas.
 * @param {string} [props.backgroundColor] - The background color of the canvas.
 * @param {{x: number, y: number}} [props.initialPosition] - The starting position of the canvas, relative to its boundary's top-left corner.
 */
export const BouncingCanvas: React.FC<BouncingCanvasProps> = ({ boundaryRef, drawFunc, backgroundColor, initialPosition }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Use refs for animation state to avoid re-renders on every frame.
    const position = useRef<{ x: number; y: number }>({ x: 100, y: 100 });
    const velocity = useRef<{ dx: number; dy: number }>({ dx: 2, dy: 2 });
    const dragInfo = useRef<{ isDragging: boolean; startX: number; startY: number }>({ isDragging: false, startX: 0, startY: 0 });
    const animationFrameId = useRef<number | null>(null);

    // The default drawing function if none is provided
    const defaultDrawFunc = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Drag Me!', width / 2, height / 2);
        ctx.font = '14px Inter, sans-serif';
        ctx.fillText('🚀', width / 2, height / 2 + 25);
    };

    const currentDrawFunc = drawFunc || defaultDrawFunc;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Draw the content using the provided or default function
        currentDrawFunc(ctx, canvas.width, canvas.height);

        // Helper function to get the bounding rectangle of the container or the window.
        const getBoundary = () => {
            if (boundaryRef && boundaryRef.current) {
                return boundaryRef.current.getBoundingClientRect();
            }
            return {
                top: 0,
                left: 0,
                right: window.innerWidth,
                bottom: window.innerHeight,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        };

        // Animation loop
        const animate = () => {
            if (!dragInfo.current.isDragging) {
                const bounds = getBoundary();
                
                const nextX = position.current.x + velocity.current.dx;
                const nextY = position.current.y + velocity.current.dy;

                // Wall collision detection against the defined boundary
                if (nextX + canvas!.width > bounds.right || nextX < bounds.left) {
                    velocity.current.dx *= -1;
                }
                if (nextY + canvas!.height > bounds.bottom || nextY < bounds.top) {
                    velocity.current.dy *= -1;
                }

                position.current.x += velocity.current.dx;
                position.current.y += velocity.current.dy;
            }
            canvas!.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
            animationFrameId.current = requestAnimationFrame(animate);
        };

        const onPointerDown = (e: PointerEvent) => {
            dragInfo.current.isDragging = true;
            canvas!.style.cursor = 'grabbing';
            // Calculate offset from the element's top-left corner
            dragInfo.current.startX = e.clientX - position.current.x;
            dragInfo.current.startY = e.clientY - position.current.y;
            // Stop bouncing when grabbed
            velocity.current = { dx: 0, dy: 0 };
        };

        const onPointerMove = (e: PointerEvent) => {
            if (dragInfo.current.isDragging) {
                const bounds = getBoundary();
                const newX = e.clientX - dragInfo.current.startX;
                const newY = e.clientY - dragInfo.current.startY;

                // Clamp the position to stay within the boundaries while dragging
                position.current.x = Math.max(bounds.left, Math.min(newX, bounds.right - canvas!.width));
                position.current.y = Math.max(bounds.top, Math.min(newY, bounds.bottom - canvas!.height));
            }
        };

        const onPointerUp = () => {
            if (dragInfo.current.isDragging) {
                dragInfo.current.isDragging = false;
                canvas!.style.cursor = 'grab';
                // Give it a random push on release to resume bouncing
                velocity.current.dx = (Math.random() - 0.5) * 8;
                velocity.current.dy = (Math.random() - 0.5) * 8;
            }
        };
        
        // Initialize position to be inside the boundary
        const initialBounds = getBoundary();
        if (initialPosition) {
             // Use the provided initial position, relative to the boundary
            position.current = {
                x: initialBounds.left + initialPosition.x,
                y: initialBounds.top + initialPosition.y,
            };
        } else {
            // Default to the center if no position is provided
            position.current = {
                x: initialBounds.left + initialBounds.width / 2 - canvas!.width / 2,
                y: initialBounds.top + initialBounds.height / 3 - canvas!.height / 2,
            };
        }
        canvas!.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;

        // Attach event listeners
        canvas.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        
        animate();

        // Cleanup function to remove listeners when the component unmounts
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            canvas.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
        };
    }, [boundaryRef, currentDrawFunc, initialPosition]); // Re-run effect if props change

    return (
        <canvas
            ref={canvasRef}
            width="200"
            height="120"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: backgroundColor || '#4f46e5', // Use prop or default
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
                borderRadius: '0.75rem',
                cursor: 'grab',
                touchAction: 'none' // Important for mobile dragging
            }}
        />
    );
};
