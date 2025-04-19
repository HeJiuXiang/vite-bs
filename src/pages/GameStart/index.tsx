import React, { useState } from 'react';
import './index.less';
import NumberMemory from './components/NumberMemory';
import FruitMatching from './components/FruitMatching';
import MusicJourney from './components/MusicJourney';
import WhackAMole from './components/WhackAMole';
import Game2048 from './components/Game2048';

const GameStart: React.FC = () => {
    const [currentGame, setCurrentGame] = useState<string | null>(null);

    const games = [
        { id: 'numberMemory', name: '数字记忆', component: <NumberMemory /> },
        { id: 'fruitMatching', name: '水果配对', component: <FruitMatching /> },
        { id: 'musicJourney', name: '音乐之旅', component: <MusicJourney /> },
        { id: 'whackAMole', name: '打地鼠', component: <WhackAMole /> },
        { id: 'game2048', name: '1024', component: <Game2048 /> }
    ];

    const handleGameClick = (gameId: string) => {
        setCurrentGame(gameId);
    };

    const handleBack = () => {
        setCurrentGame(null);
    };

    const renderGameContent = () => {
        const game = games.find(g => g.id === currentGame);
        if (!game) return null;
        return game.component;
    };

    return (
        <div className="game-start-container">
            <h1 className="game-start-title">开始游戏</h1>
            {currentGame ? (
                <div className="game-content">
                    <button className="back-button" onClick={handleBack}>返回</button>
                    {renderGameContent()}
                </div>
            ) : (
                <div className="games-grid">
                    {games.map(game => (
                        <div
                            key={game.id}
                            className="game-card"
                            onClick={() => handleGameClick(game.id)}
                        >
                            <h2>{game.name}</h2>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GameStart; 