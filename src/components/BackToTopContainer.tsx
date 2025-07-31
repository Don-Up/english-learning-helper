"use client"
import React, {useEffect, useRef, useState} from "react";

interface BackToTopContainerProps {
    children: React.ReactNode;
    className?: string;
}

const BackToTopButton: React.FC<BackToTopButtonProps> = ({
                                                             imageSrc,
                                                             width = 50,
                                                             height = 50,
                                                             scrollThreshold = 300,
                                                             scrollContainerRef,
                                                         }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollContainerRef?.current) {
                setIsVisible(scrollContainerRef.current.scrollTop > scrollThreshold); // 父容器滚动超过 300px 时显示
            }
        };

        const currentRef = scrollContainerRef?.current;
        currentRef?.addEventListener("scroll", handleScroll);

        return () => {
            currentRef?.removeEventListener("scroll", handleScroll);
        };
    }, [scrollContainerRef]);

    const scrollToTop = () => {
        if (scrollContainerRef?.current) {
            scrollContainerRef.current.scrollTo({top: 0, behavior: "smooth"});
        }
    };

    return (
        <button
            onClick={scrollToTop}
            style={{display: isVisible ? "block" : "none"}}
            className="fixed bottom-10 right-10 z-50 bg-transparent border-none focus:outline-none"
        >
            <img
                src={imageSrc}
                alt="Back to Top"
                width={width}
                height={height}
                className="cursor-pointer transition-transform hover:scale-110"
            />
        </button>
    );
};

const BackToTopContainer: React.FC<BackToTopContainerProps & Omit<BackToTopButtonProps, 'scrollContainerRef'>> = ({
                                                                                          imageSrc,
                                                                                          width = 50,
                                                                                          height = 50,
                                                                                          scrollThreshold = 300,
                                                                                          children,
                                                                                          className,
                                                                                      }) => {

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    return (<div ref={scrollContainerRef} className={className}>
        {children}
        <BackToTopButton imageSrc={imageSrc} scrollContainerRef={scrollContainerRef} width={width} height={height}
                         scrollThreshold={scrollThreshold}/>
    </div>)
}

interface BackToTopButtonProps {
    imageSrc: string;
    width?: number;
    height?: number;
    scrollThreshold?: number;
    scrollContainerRef?: React.RefObject<HTMLDivElement | null>; // 父容器引用
}

export default BackToTopContainer