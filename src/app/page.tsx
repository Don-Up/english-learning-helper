import ContentInput from "@/components/ContentInput";
import CardList from "@/components/CardList";
import BackToTopContainer from "@/components/BackToTopContainer";

export default function Home() {


    return (
        <BackToTopContainer
            imageSrc="/backtotop.svg"
            className="flex justify-center bg-gray-900 h-screen max-h-screen overflow-auto custom-scrollbar">
            <div className="p-4 w-1/2">
                <div className="text-5xl mt-4 text-gray-100 font-bold">English Learning Helper</div>
                <ContentInput />
                <CardList/>
            </div>
        </BackToTopContainer>
    );
}