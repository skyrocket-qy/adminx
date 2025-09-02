"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

export default function AsciiLogo({ config = {} }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // ---- States & Refs ----
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Simulation refs
  const charWidth = useRef(0);
  const charHeight = useRef(0);
  const offsetX = useRef(0);
  const offsetY = useRef(0);
  const logoGrid = useRef<any[]>([]);
  const ejectedPieces = useRef<any[]>([]);
  const robot = useRef<any>(null);

  const paused = useRef(false);
  const hidden = useRef(false);
  const lastFrame = useRef(0);
  const tickEject = useRef(0);

  // ---- Default Config ----
  const defaults = {
    // Georgia11, Georgi16, Broadway, AMC Tubes, 4Max
    logoText: [
        "       db                                           ",
        "      ;MM:                                          ",
        "     ,V^MM.    '7Mb,od8 .gP^Ya '7MMpMMMb.   ,6^Yb.  ",
        "    ,M  'MM      MM' ^',M'   Yb  MM    MM  8)   MM  ",
        "    AbmmmqMA     MM    8M^^^^^^  MM    MM   ,pm9MM  ",
        "   A'     VML    MM    YM.    ,  MM    MM  8M   MM  ",
        " .AMA.   .AMMA..JMML.   'Mbmmd'.JMML  JMML.'Moo9^Yo.",
    ],
    mobileLogoText: [
        "       db                                           ",
        "      ;MM:                                          ",
        "     ,V^MM.    '7Mb,od8 .gP^Ya '7MMpMMMb.   ,6^Yb.  ",
        "    ,M  'MM      MM' ^',M'   Yb  MM    MM  8)   MM  ",
        "    AbmmmqMA     MM    8M^^^^^^  MM    MM   ,pm9MM  ",
        "   A'     VML    MM    YM.    ,  MM    MM  8M   MM  ",
        " .AMA.   .AMMA..JMML.   'Mbmmd'.JMML  JMML.'Moo9^Yo.",
    ],
    fontSize: 16,
    fontFamily: "SF Mono, monospace",
    textColor: "#784fcf",
    fontWeight: "bold",
    emptySlotChar: ".",
    backgroundColor: "#1D0245",
    viewportBackgroundColor: "#1D0245",

    // Physics
    initialEjectedPiecesCount: 15,
    ejectionIntervalMs: 700,
    ejectedPieceBaseSpeed: 3,
    ejectedPieceDamping: 0.98,
    maxEjectedPieces: 30,
    ejectedPieceColors: ["#E1308D", "#0FD3D3", "#F0C642", "#472394"],

    // Robot
    robotChar: "@",
    robotColor: "#fffbeb",
    robotMoveInterval: 4,
    robotPickupDelay: 8,
    robotPlaceDelay: 8,

    // Controls
    pauseKey: "p",

    // Logical dimensions
    logicalCharWidth: 100,
    logicalCharHeight: 20,
    mobileLogicalCharWidth: 60,
    mobileLogicalCharHeight: 20,
  };

  const mergedConfig = useMemo(() => {
    return {
      ...defaults,
      ...config,
    };
  }, [config]);

  // ---- Helpers ----

  const measureChar = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return false;

    ctx.font = `${mergedConfig.fontWeight} ${mergedConfig.fontSize}px ${mergedConfig.fontFamily}`;
    charWidth.current = ctx.measureText("M").width;
    charHeight.current = mergedConfig.fontSize * 1.2;
    return charWidth.current > 0;
  }, [mergedConfig]);

  const initLogoGrid = useCallback(() => {
    logoGrid.current = [];
    const canvas = canvasRef.current;
    if (!canvas) return;

    const lines = isMobile
      ? mergedConfig.mobileLogoText
      : mergedConfig.logoText;

    const rows = lines.length;
    const cols = Math.max(...lines.map((l) => l.length));
    const w = cols * charWidth.current;
    const h = rows * charHeight.current;

    offsetX.current = Math.floor((canvas.width - w) / 2);
    offsetY.current = Math.floor((canvas.height - h) / 2);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const ch = lines[r][c] ?? " ";
        if (ch !== " ") {
          logoGrid.current.push({
            char: ch,
            isSlotEmpty: false,
            logoGridR: r,
            logoGridC: c,
            canvasX: offsetX.current + c * charWidth.current,
            canvasY: offsetY.current + r * charHeight.current,
            isTargetedForReturn: false,
          });
        }
      }
    }
  }, [isMobile, mergedConfig]);

  const initRobot = useCallback(() => {
    const midC = Math.floor(mergedConfig.logicalCharWidth / 2);
    const midR = Math.floor(mergedConfig.logicalCharHeight / 2);
    robot.current = {
      gridC: midC,
      gridR: midR,
      char: mergedConfig.robotChar,
      color: mergedConfig.robotColor,
      state: "IDLE",
      targetPiece: null,
      targetSlot: null,
      carryingPieceData: null,
      moveTimer: 0,
      actionTimer: 0,
    };
  }, [mergedConfig]);

  // ---- Simulation Step ----

  const stepEjection = useCallback(
    (dt: number) => {
      tickEject.current += dt;
      if (
        tickEject.current >= mergedConfig.ejectionIntervalMs &&
        ejectedPieces.current.length < mergedConfig.maxEjectedPieces
      ) {
        tickEject.current -= mergedConfig.ejectionIntervalMs;
        const candidates = logoGrid.current.filter((c) => !c.isSlotEmpty);
        if (candidates.length > 0) {
          const piece = candidates[Math.floor(Math.random() * candidates.length)];
          piece.isSlotEmpty = true;
          const angle = Math.random() * Math.PI * 2;
          const speed =
            mergedConfig.ejectedPieceBaseSpeed *
            (0.7 + Math.random() * 0.6);
          ejectedPieces.current.push({
            char: piece.char,
            originalLogoGridR: piece.logoGridR,
            originalLogoGridC: piece.logoGridC,
            x: piece.canvasX + charWidth.current / 2,
            y: piece.canvasY + charHeight.current / 2,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color:
              mergedConfig.ejectedPieceColors[
                Math.floor(
                  Math.random() * mergedConfig.ejectedPieceColors.length
                )
              ],
            isTargetedForPickup: false,
          });
        }
      }

      // Update positions
      for (let i = ejectedPieces.current.length - 1; i >= 0; i--) {
        const p = ejectedPieces.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= mergedConfig.ejectedPieceDamping;
        p.vy *= mergedConfig.ejectedPieceDamping;
        if (isNaN(p.x) || isNaN(p.y)) {
          ejectedPieces.current.splice(i, 1);
        }
      }
    },
    [mergedConfig]
  );

  const stepRobot = useCallback(() => {
    const r = robot.current;
    if (!r) return;

    r.moveTimer = Math.max(0, r.moveTimer - 1);
    r.actionTimer = Math.max(0, r.actionTimer - 1);

    // Simplified state machine: robot looks for nearest piece, picks, returns
    switch (r.state) {
      case "IDLE": {
        const available = ejectedPieces.current.filter(
          (p) => !p.isTargetedForPickup
        );
        if (available.length > 0) {
          const target = available[0];
          target.isTargetedForPickup = true;
          r.targetPiece = target;
          r.state = "MOVING_TO_PICKUP";
        }
        break;
      }
      case "MOVING_TO_PICKUP": {
        if (!r.targetPiece) {
          r.state = "IDLE";
          break;
        }
        const targetC = Math.round(r.targetPiece.x / charWidth.current);
        const targetR = Math.round(r.targetPiece.y / charHeight.current);
        if (r.gridC === targetC && r.gridR === targetR) {
          r.state = "AT_PIECE";
          r.actionTimer = mergedConfig.robotPickupDelay;
        } else if (r.moveTimer <= 0) {
          if (Math.abs(targetC - r.gridC) > Math.abs(targetR - r.gridR)) {
            r.gridC += Math.sign(targetC - r.gridC);
          } else {
            r.gridR += Math.sign(targetR - r.gridR);
          }
          r.moveTimer = mergedConfig.robotMoveInterval;
        }
        break;
      }
      case "AT_PIECE": {
        if (r.actionTimer <= 0 && r.targetPiece) {
          r.carryingPieceData = {
            char: r.targetPiece.char,
            originalLogoGridR: r.targetPiece.originalLogoGridR,
            originalLogoGridC: r.targetPiece.originalLogoGridC,
          };
          ejectedPieces.current = ejectedPieces.current.filter(
            (p) => p !== r.targetPiece
          );
          r.targetPiece = null;
          r.targetSlot = logoGrid.current.find(
            (slot) =>
              slot.logoGridR === r.carryingPieceData.originalLogoGridR &&
              slot.logoGridC === r.carryingPieceData.originalLogoGridC
          );
          r.state = "MOVING_TO_SLOT";
        }
        break;
      }
      case "MOVING_TO_SLOT": {
        if (!r.targetSlot) {
          r.state = "IDLE";
          r.carryingPieceData = null;
          break;
        }
        const targetC = Math.floor(r.targetSlot.canvasX / charWidth.current);
        const targetR = Math.floor(r.targetSlot.canvasY / charHeight.current);
        if (r.gridC === targetC && r.gridR === targetR) {
          r.state = "AT_SLOT";
          r.actionTimer = mergedConfig.robotPlaceDelay;
        } else if (r.moveTimer <= 0) {
          if (Math.abs(targetC - r.gridC) > Math.abs(targetR - r.gridR)) {
            r.gridC += Math.sign(targetC - r.gridC);
          } else {
            r.gridR += Math.sign(targetR - r.gridR);
          }
          r.moveTimer = mergedConfig.robotMoveInterval;
        }
        break;
      }
      case "AT_SLOT": {
        if (r.actionTimer <= 0 && r.targetSlot) {
          r.targetSlot.isSlotEmpty = false;
          r.carryingPieceData = null;
          r.targetSlot = null;
          r.state = "IDLE";
        }
        break;
      }
      default:
        r.state = "IDLE";
    }
  }, [mergedConfig]);

  // ---- Render ----

  const draw = useCallback(() => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    // ctx.fillStyle = mergedConfig.backgroundColor;
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${mergedConfig.fontWeight} ${mergedConfig.fontSize}px ${mergedConfig.fontFamily}`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    // Logo grid
    for (const cell of logoGrid.current) {
      ctx.fillStyle = cell.isSlotEmpty
        ? mergedConfig.textColor + "33"
        : mergedConfig.textColor;
      ctx.fillText(cell.char, cell.canvasX, cell.canvasY);
    }

    // Ejected pieces
    for (const p of ejectedPieces.current) {
      ctx.fillStyle = p.color;
      ctx.fillText(p.char, p.x, p.y);
    }

    // Robot
    const r = robot.current;
    if (r) {
      ctx.fillStyle = r.color;
      ctx.fillText(
        r.char,
        r.gridC * charWidth.current,
        r.gridR * charHeight.current
      );
    }

    if (paused.current) {
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = `bold ${mergedConfig.fontSize * 1.5}px ${mergedConfig.fontFamily}`;
      ctx.textAlign = "center";
      ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
    }
  }, [mergedConfig]);

  // ---- Animation Loop ----

  const loop = useCallback(
    (ts: number) => {
      if (!lastFrame.current) lastFrame.current = ts;
      const dt = ts - lastFrame.current;
      lastFrame.current = ts;

      if (!paused.current && !hidden.current) {
        stepEjection(dt);
        stepRobot();
      }
      draw();
      rafRef.current = requestAnimationFrame(loop);
    },
    [draw, stepEjection, stepRobot]
  );

  // ---- Init ----

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctxRef.current = canvas.getContext("2d");

    if (!measureChar()) {
      console.error("Failed to measure font char size");
      return;
    }

    canvas.width =
      (isMobile
        ? mergedConfig.mobileLogicalCharWidth
        : mergedConfig.logicalCharWidth) * charWidth.current;
    canvas.height =
      (isMobile
        ? mergedConfig.mobileLogicalCharHeight
        : mergedConfig.logicalCharHeight) * charHeight.current;

    initLogoGrid();
    initRobot();
    ejectedPieces.current = [];

    lastFrame.current = performance.now();
    rafRef.current = requestAnimationFrame(loop);

    // Handle pause key
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === mergedConfig.pauseKey.toLowerCase()) {
        paused.current = !paused.current;
      }
    };

    window.addEventListener("keydown", onKey);

    // Pause if canvas not visible
    const observer = new IntersectionObserver(([entry]) => {
      hidden.current = !entry.isIntersecting;
    });
    observer.observe(canvas);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", onKey);
      observer.unobserve(canvas);
    };
  }, [
    measureChar,
    initLogoGrid,
    initRobot,
    loop,
    mergedConfig,
    isMobile,
  ]);

  // Mobile detection
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="relative flex justify-center align-center mt-4 md:mt-0">
      <canvas
        ref={canvasRef}
        className="block w-full h-full pixelated-img"
      />
      <h1 className="absolute bottom-10 md:bottom-20 text-purple-50 bg-[#1D0245] p-2">
        Welcome! dive everywhere to enjoy this world
      </h1>
    </div>
  );
}
