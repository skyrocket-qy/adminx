import { describe, expect, it, vi } from 'vitest';
import { drawBasicGrid, drawHeaderWithBlockText } from '../canvas-drawer';

function makeContext() {
  const ctx = {
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    strokeRect: vi.fn(),
    fillText: vi.fn(),
    getImageData: vi.fn(() => ({ data: new Uint8ClampedArray(4) })),
    font: '',
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 0,
    textAlign: '',
    textBaseline: '',
  };
  return ctx as unknown as CanvasRenderingContext2D & {
    clearRect: ReturnType<typeof vi.fn>;
    fillRect: ReturnType<typeof vi.fn>;
    strokeRect: ReturnType<typeof vi.fn>;
    fillText: ReturnType<typeof vi.fn>;
  };
}

describe('drawBasicGrid', () => {
  it('clears, fills the background and strokes grid cells', () => {
    const ctx = makeContext();
    drawBasicGrid(ctx, 30, 30);

    expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, 30, 30);
    expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 30, 30);
    // CELL_SIZE is 4, so a 30x30 grid yields 8x8 cells.
    expect(ctx.strokeRect).toHaveBeenCalledTimes(64);
  });

  it('applies the provided colors', () => {
    const ctx = makeContext();
    drawBasicGrid(ctx, 8, 8, { bg: '#000000', line: '#ffffff' });

    expect(ctx.fillStyle).toBe('#000000');
    expect(ctx.strokeStyle).toBe('#ffffff');
  });
});

describe('drawHeaderWithBlockText', () => {
  it('draws the grid and renders text through the offscreen stencil without throwing', () => {
    const ctx = makeContext();

    expect(() =>
      drawHeaderWithBlockText(ctx, 40, 40, 'Hi', { bg: '#2E1A47', line: '#333' })
    ).not.toThrow();

    // 40 / 4 = 11 cells per axis -> 121 grid squares.
    expect(ctx.strokeRect).toHaveBeenCalledTimes(121);
  });
});
