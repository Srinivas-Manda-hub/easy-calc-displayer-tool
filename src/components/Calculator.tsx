import React, { useState } from 'react';
import { Calculator as CalculatorIcon, Delete, RotateCcw, X } from 'lucide-react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const deleteLastDigit = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleProjectLink = () => {
    window.open(window.location.href, '_blank');
  };

  const Button = ({ 
    children, 
    onClick, 
    className = '', 
    variant = 'default' 
  }: { 
    children: React.ReactNode; 
    onClick: () => void; 
    className?: string; 
    variant?: 'default' | 'operator' | 'equals' | 'clear' | 'number';
  }) => {
    const baseClasses = "h-16 rounded-2xl font-semibold text-lg transition-all duration-200 active:scale-95 hover:shadow-lg";
    
    const variantClasses = {
      default: "bg-gray-700 hover:bg-gray-600 text-white",
      number: "bg-gray-800 hover:bg-gray-700 text-white shadow-md hover:shadow-xl",
      operator: "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-xl",
      equals: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-xl",
      clear: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-xl"
    };

    return (
      <button
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-3xl shadow-2xl p-6 w-full max-w-sm border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <CalculatorIcon className="text-blue-400 mr-2" size={28} />
          <h1 className="text-white text-xl font-bold">Calculator</h1>
        </div>

        {/* Display */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <div className="text-right">
            <div className="text-gray-400 text-sm mb-1">
              {previousValue !== null && operation ? `${previousValue} ${operation}` : ''}
            </div>
            <div className="text-white text-3xl font-light break-all">
              {display}
            </div>
          </div>
        </div>

        {/* Centered X Mark Link */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleProjectLink}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
            title="View Project Output"
          >
            <X size={24} />
          </button>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button onClick={clear} variant="clear" className="col-span-2">
            <RotateCcw size={20} className="mr-2" />
            Clear
          </Button>
          <Button onClick={deleteLastDigit} variant="default">
            <Delete size={20} />
          </Button>
          <Button onClick={() => performOperation('÷')} variant="operator">
            ÷
          </Button>

          {/* Row 2 */}
          <Button onClick={() => inputNumber('7')} variant="number">7</Button>
          <Button onClick={() => inputNumber('8')} variant="number">8</Button>
          <Button onClick={() => inputNumber('9')} variant="number">9</Button>
          <Button onClick={() => performOperation('×')} variant="operator">×</Button>

          {/* Row 3 */}
          <Button onClick={() => inputNumber('4')} variant="number">4</Button>
          <Button onClick={() => inputNumber('5')} variant="number">5</Button>
          <Button onClick={() => inputNumber('6')} variant="number">6</Button>
          <Button onClick={() => performOperation('-')} variant="operator">-</Button>

          {/* Row 4 */}
          <Button onClick={() => inputNumber('1')} variant="number">1</Button>
          <Button onClick={() => inputNumber('2')} variant="number">2</Button>
          <Button onClick={() => inputNumber('3')} variant="number">3</Button>
          <Button onClick={() => performOperation('+')} variant="operator">+</Button>

          {/* Row 5 */}
          <Button onClick={() => inputNumber('0')} variant="number" className="col-span-2">0</Button>
          <Button onClick={inputDecimal} variant="number">.</Button>
          <Button onClick={handleEquals} variant="equals">=</Button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
