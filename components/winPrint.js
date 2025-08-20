
const WinPrint = () => {

const print = () => {
    window.print();
    };

return (
    <button
        aria-label="Download Resume"
        // className="exclude-print fixed bottom-5 right-10 font-bold rounded-full bg-white text-gray-600 shadow-lg border-2 border-white"
        onClick={print}
      >
Download Resume      </button>
    );
};

export default WinPrint;