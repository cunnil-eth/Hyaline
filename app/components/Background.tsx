export default function Background() {
    return (
        <div className="fixed inset-0 opacity-20">
            <svg
              viewBox="0 0 1000 1000"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <path
                d="M0,1000 C200,900 350,800 400,600 C450,400 550,300 800,400 C1050,500 1000,0 1000,0"
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1"
              />
              <path
                d="M0,1000 C300,950 400,800 450,600 C500,400 600,200 800,300 C1000,400 1000,0 1000,0"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
              />
              <path
                d="M0,1000 C150,950 300,900 400,700 C500,500 600,400 800,500 C1000,600 1000,0 1000,0"
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1"
              />
              <path
                d="M0,800 C200,750 300,650 350,500 C400,350 500,250 700,300 C900,350 1000,0 1000,0"
                fill="none"
                stroke="rgba(255,255,255,0.27)"
                strokeWidth="1"
              />
              <path
                d="M0,600 C250,550 350,500 400,400 C450,300 550,200 750,250 C950,300 1000,0 1000,0"
                fill="none"
                stroke="rgba(255,255,255,0.23)"
                strokeWidth="1"
              />
            </svg>
        </div>
    );
}
