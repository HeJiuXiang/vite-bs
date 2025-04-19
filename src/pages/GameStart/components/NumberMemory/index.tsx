import React, { useState, useEffect } from 'react';
import './index.less';

interface Card {
    id: number;
    number: number;
    isFlipped: boolean;
    isMatched: boolean;
    isError?: boolean;
}

const NumberMemory: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [countdown, setCountdown] = useState(9);
    const [currentStep, setCurrentStep] = useState(0);
    const [nextNumber, setNextNumber] = useState(1);
    const [showResult, setShowResult] = useState(false);
    const [resultMessage, setResultMessage] = useState('');
    const [showCountdown, setShowCountdown] = useState(false);

    // 初始化卡片
    useEffect(() => {
        const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
        const shuffledNumbers = [...numbers].sort(() => Math.random() - 0.5);
        const initialCards = shuffledNumbers.map((number, index) => ({
            id: index,
            number,
            isFlipped: false,
            isMatched: false
        }));
        setCards(initialCards);
    }, []);

    // 开始游戏
    const startGame = () => {
        setGameStarted(true);
        setGameOver(false);
        setNextNumber(1);
        setCurrentStep(0);
        setCountdown(9);
        setShowCountdown(false);

        // 重置所有卡片
        setCards(prevCards => prevCards.map(card => ({
            ...card,
            isFlipped: false,
            isMatched: false
        })));

        // 依次翻转卡片
        const flipSequence = async () => {
            for (let i = 0; i < cards.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 200));
                setCards(prevCards =>
                    prevCards.map(card =>
                        card.id === i ? { ...card, isFlipped: true } : card
                    )
                );
            }

            // 等待所有卡片翻转完成
            await new Promise(resolve => setTimeout(resolve, 600));

            // 显示倒计时
            setShowCountdown(true);

            // 开始倒计时
            const timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        // 倒计时结束后翻转回背面
                        setCards(prevCards =>
                            prevCards.map(card => ({ ...card, isFlipped: false }))
                        );
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        };

        flipSequence();
    };

    // 处理卡片点击
    const handleCardClick = async (card: Card) => {
        if (!gameStarted || gameOver || card.isFlipped || card.isMatched) return;

        // 翻转卡片
        setCards(prevCards =>
            prevCards.map(c =>
                c.id === card.id ? { ...c, isFlipped: true } : c
            )
        );

        // 等待翻转动画完成
        await new Promise(resolve => setTimeout(resolve, 600));

        if (card.number === nextNumber) {
            // 正确选择
            setCards(prevCards =>
                prevCards.map(c =>
                    c.id === card.id ? { ...c, isMatched: true } : c
                )
            );
            setNextNumber(prev => prev + 1);

            if (nextNumber === 9) {
                // 挑战成功
                setResultMessage('恭喜你挑战成功！');
                setShowResult(true);
                setGameOver(true);
            }
        } else {
            // 错误选择
            setCards(prevCards =>
                prevCards.map(c =>
                    c.id === card.id ? { ...c, isError: true } : c
                )
            );
            setResultMessage('游戏结束！');
            setShowResult(true);
            setGameOver(true);
        }
    };

    // 重置游戏状态
    const resetGame = () => {
        setGameStarted(false);
        setGameOver(false);
        setShowResult(false);
        setResultMessage('');
        setShowCountdown(false);
        setNextNumber(1);
        setCurrentStep(0);
        setCountdown(9);

        // 重置所有卡片
        setCards(prevCards => prevCards.map(card => ({
            ...card,
            isFlipped: false,
            isMatched: false,
            isError: false
        })));
    };

    return (
        <div className="number-memory-container">
            <h2>数字记忆游戏</h2>
            <div className="game-content">
                <div className="game-header">
                    {!gameStarted && !gameOver && (
                        <button className="start-button" onClick={startGame}>
                            开始游戏
                        </button>
                    )}

                    {showCountdown && countdown > 0 && (
                        <div className="countdown">倒计时: {countdown}秒</div>
                    )}

                    {showResult && (
                        <div className="result-message">
                            {resultMessage}
                            <button className="restart-button" onClick={resetGame}>
                                重新开始
                            </button>
                        </div>
                    )}
                </div>

                <div className="card-grid">
                    {cards.map(card => (
                        <div
                            key={card.id}
                            className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''} ${card.isError ? 'error' : ''}`}
                            onClick={() => handleCardClick(card)}
                        >
                            <div className="card-inner">
                                <div className="card-front">
                                    {card.number}
                                </div>
                                <div className="card-back">
                                    ?
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NumberMemory; 