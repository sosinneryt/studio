
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { shuffle } from 'lodash';

const colorPalette = [
  '#FFD6C0', '#FFA8A0', '#FFDEE9', '#D6C6EA',
  '#B8E0FF', '#A2D5C6', '#C1CEE6', '#B5EAD7',
];

const generateTiles = () => {
  const pairs = colorPalette.concat(colorPalette);
  return shuffle(pairs.map((color, index) => ({ id: index, color, isFlipped: false, isMatched: false })));
};

export function ColorMatch() {
  const [tiles, setTiles] = useState(generateTiles());
  const [flippedTiles, setFlippedTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (flippedTiles.length === 2) {
      setMoves(prevMoves => prevMoves + 1);
      const [firstIndex, secondIndex] = flippedTiles;
      const firstTile = tiles[firstIndex];
      const secondTile = tiles[secondIndex];

      if (firstTile.color === secondTile.color) {
        // Match
        setTiles(prevTiles => prevTiles.map((tile) => 
          (tile.id === firstTile.id || tile.id === secondTile.id) ? { ...tile, isMatched: true, isFlipped: true } : tile
        ));
        setFlippedTiles([]);
      } else {
        // No match
        setTimeout(() => {
          setTiles(prevTiles => prevTiles.map((tile, i) =>
            (i === firstIndex || i === secondIndex) ? { ...tile, isFlipped: false } : tile
          ));
          setFlippedTiles([]);
        }, 1000);
      }
    }
  }, [flippedTiles, tiles]);

  const handleTileClick = (index: number) => {
    if (flippedTiles.length < 2 && !tiles[index].isFlipped) {
      setTiles(prevTiles => prevTiles.map((tile, i) => 
        i === index ? { ...tile, isFlipped: true } : tile
      ));
      setFlippedTiles(prev => [...prev, index]);
    }
  };

  const resetGame = () => {
    setTiles(generateTiles());
    setFlippedTiles([]);
    setMoves(0);
  };
  
  const allMatched = tiles.every(tile => tile.isMatched);

  return (
    <div className="flex flex-col items-center">
       <style jsx>{`
        .tile-container {
          perspective: 1000px;
        }
        .tile {
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }
        .tile.flipped {
          transform: rotateY(180deg);
        }
        .tile-face {
          backface-visibility: hidden;
        }
        .tile-back {
          transform: rotateY(180deg);
        }
      `}</style>
      <div className="grid grid-cols-4 gap-3">
        {tiles.map((tile, index) => (
          <div key={tile.id} className="w-12 h-12 tile-container">
            <button
                onClick={() => handleTileClick(index)}
                disabled={tile.isFlipped || tile.isMatched}
                className={cn(
                    "relative w-full h-full tile cursor-pointer",
                    tile.isFlipped && 'flipped',
                    tile.isMatched && 'cursor-default'
                )}
            >
                {/* Front of the card */}
                <div 
                    className={cn(
                        "absolute w-full h-full rounded-lg tile-face",
                        "bg-secondary"
                    )}
                />
                {/* Back of the card */}
                <div
                    className={cn("absolute w-full h-full rounded-lg tile-face tile-back")}
                    style={{ backgroundColor: tile.color }}
                />
            </button>
          </div>
        ))}
      </div>
      
       {allMatched ? (
        <div className="mt-6 text-center">
            <p className="text-xl font-semibold text-primary flex items-center">
                <Check className="w-6 h-6 mr-2"/>
                Well done!
            </p>
            <p className="text-muted-foreground">You completed it in {moves} moves.</p>
        </div>
      ) : (
         <p className="mt-6 text-muted-foreground">Moves: {moves}</p>
      )}

      <Button onClick={resetGame} variant="outline" className="mt-4">
        Reset Game
      </Button>
    </div>
  );
}
