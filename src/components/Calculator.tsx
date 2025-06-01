
import React, { useState } from 'react';

const Calculator = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState('');

  const handleCalculate = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    
    if (isNaN(n1) || isNaN(n2)) {
      setResult('Please enter valid numbers.');
      return;
    }

    let calculatedResult = 0;
    switch (operation) {
      case 'add':
        calculatedResult = n1 + n2;
        break;
      case 'subtract':
        calculatedResult = n1 - n2;
        break;
      case 'multiply':
        calculatedResult = n1 * n2;
        break;
      case 'divide':
        calculatedResult = n2 !== 0 ? n1 / n2 : 0;
        if (n2 === 0) {
          setResult('Cannot divide by zero');
          return;
        }
        break;
      default:
        calculatedResult = 0;
    }
    
    setResult(`Result: ${calculatedResult}`);
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
        padding: '40px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{
          color: 'white',
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '28px',
          fontWeight: '300'
        }}>
          Simple Calculator
        </h1>

        <div style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '20px'
        }}>
          <input
            type="number"
            placeholder="Number 1"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            style={{
              flex: 1,
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.9)',
              fontSize: '16px',
              outline: 'none'
            }}
          />
          <input
            type="number"
            placeholder="Number 2"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            style={{
              flex: 1,
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.9)',
              fontSize: '16px',
              outline: 'none'
            }}
          />
        </div>

        <div style={{
          marginBottom: '20px'
        }}>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontSize: '16px',
              outline: 'none'
            }}
          >
            <option value="add" style={{ color: 'black' }}>Addition (+)</option>
            <option value="subtract" style={{ color: 'black' }}>Subtraction (-)</option>
            <option value="multiply" style={{ color: 'black' }}>Multiplication (×)</option>
            <option value="divide" style={{ color: 'black' }}>Division (÷)</option>
          </select>
        </div>

        <button
          onClick={handleCalculate}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: '10px',
            border: 'none',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '20px',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          Calculate
        </button>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          padding: '20px',
          textAlign: 'center',
          color: 'white',
          fontSize: '18px',
          minHeight: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {result || 'Result: Please enter valid numbers.'}
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '20px',
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '14px'
        }}>
          By Project 2 Calculator
        </div>
      </div>
    </div>
  );
};

export default Calculator;
