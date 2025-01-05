export const Loader = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            width="auto"
            height="auto"
            style={{ shapeRendering: 'auto', display: 'block' }}
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <g>
                <path
                    style={{
                        transform: 'scale(1)',
                        transformOrigin: '50px 50px',
                    }}
                    stroke-linecap="round"
                    d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
                    stroke-dasharray="205.271142578125 51.317785644531256"
                    stroke-width="5"
                    stroke="#0c58e9"
                    fill="none"
                >
                    <animate
                        values="0;256.58892822265625"
                        keyTimes="0;1"
                        dur="1.25s"
                        repeatCount="indefinite"
                        attributeName="stroke-dashoffset"
                    ></animate>
                </path>
                <g></g>
            </g>
        </svg>
    );
};
