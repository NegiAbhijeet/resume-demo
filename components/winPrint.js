
const WinPrint = () => {

    const print = () => {
        window.print();
    };

    return (
        <button
            aria-label="Download Resume"
            onClick={print}
        >
            Download Resume
        </button>
    );
};

export default WinPrint;