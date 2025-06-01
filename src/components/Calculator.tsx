
import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        width: '100%',
        maxWidth: '350px'
      }}>
        <h1 style={{
          color: 'white',
          textAlign: 'center',
          marginBottom: '20px',
          fontSize: '24px',
          fontWeight: '300'
        }}>
          Calculator
        </h1>

        {/* Display */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '20px',
          textAlign: 'right',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
          minHeight: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          wordBreak: 'break-all'
        }}>
          {display}
        </div>

        {/* Buttons Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: '10px'
        }}>
          {/* First Row */}
          <button
            onClick={clearDisplay}
            style={{
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              gridColumn: 'span 2'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            Clear
          </button>
          <button
            onClick={clearEntry}
            style={{
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            CE
          </button>
          <button
            onClick={() => inputOperation('÷')}
            style={{
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 165, 0, 0.7)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 165, 0, 0.9)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 165, 0, 0.7)';
            }}
          >
            ÷
          </button>

          {/* Numbers in 2 columns layout */}
          <button
            onClick={() => inputNumber('7')}
            style={{
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            7
          </button>
          <button
            onClick={() => inputNumber('8')}
            style={{
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            8
          </button>
          <button
            onClick={() => inputNumber('9')}
            style={{
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            9
          </button>
          <button
            onClick={() => inputOperation('×')}
            style={{
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 165, 0, 0.7)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 165, 0, 0.9)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 165, 0, 0.7)';
            }}
          >
            ×
          </button>

          <button
            onClick={() => inputNumber('4')}
            style={{
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            4
          </button>
          <button
            onClick={() => inputNumber('5')}
            style={{
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            5
          </button>
          <button
            onClick={() => inputNumber('6')}
            style={{
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            6
          </button>
          <button
            onClick={() => inputOperation('-')}
            style={{
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 165, 0, 0.7)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 165, 0, 0.9)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 165, 0, 0.7)';
            }}
          >
            -
          </button>

          <button
            onClick={() => inputNumber('1')}
            style={{
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            1
          </button>
          <button
            onClick={() => inputNumber('2')}
            style={{
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            2
          </button>
          <button
            onClick={() => inputNumber('3')}
            style={{
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            3
          </button>
          <button
            onClick={() => inputOperation('+')}
            style={{
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 165, 0, 0.7)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 165, 0, 0.9)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 165, 0, 0.7)';
            }}
          >
            +
          </button>

          <button
            onClick={() => inputNumber('0')}
            style={{
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              gridColumn: 'span 2'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            style={{
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            .
          </button>
          <button
            onClick={performCalculation}
            style={{
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 165, 0, 0.7)',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 165, 0, 0.9)';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.background = 'rgba(255, 165, 0, 0.7)';
            }}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
