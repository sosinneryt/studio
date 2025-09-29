
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Check, Lightbulb } from 'lucide-react';
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
        setTiles(prevTiles => prevTiles.map((tile, index) => 
          (index === firstIndex || index === secondIndex) ? { ...tile, isMatched: true } : tile
        ));
        setFlippedTiles([]);
      } else {
        // No match
        setTimeout(() => {
          setTiles(prevTiles => prevTiles.map((tile, index) =>
            (index === firstIndex || index === secondIndex) ? { ...tile, isFlipped: false } : tile
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
      setFlippedTiles([...flippedTiles, index]);
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
      <div className="grid grid-cols-4 gap-3 p-4 bg-primary/10 rounded-lg">
        {tiles.map((tile, index) => (
          <button
            key={tile.id}
            onClick={() => handleTileClick(index)}
            disabled={tile.isFlipped || tile.isMatched}
            className={cn(
              "w-12 h-12 rounded-lg transition-all duration-300 transform-gpu",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              (tile.isFlipped || tile.isMatched) ? 'rotate-y-180' : '',
              tile.isMatched ? 'opacity-50 cursor-default' : 'cursor-pointer'
            )}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className={cn("absolute w-full h-full backface-hidden rounded-lg", tile.isFlipped || tile.isMatched ? 'z-10' : 'z-20')}
                 style={{ backgroundColor: (tile.isFlipped || tile.isMatched) ? tile.color : 'hsl(var(--secondary))' }}/>
          </button>
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

      <style jsx>{`
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
      `}</style>
    </div>
  );
}
