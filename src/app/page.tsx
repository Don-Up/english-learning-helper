import ContentInput from "@/components/ContentInput";
import ListItem from "@/components/ListItem";
import CardList from "@/components/CardList";

export default function Home() {
    return (
        <div className="flex justify-center bg-gray-900 h-screen max-h-screen overflow-auto custom-scrollbar">
            <div className="p-4 w-1/2">
                <div className="text-5xl mt-4 text-gray-100 font-bold">Language Learning Helper</div>
                <ContentInput />
                <CardList/>
            </div>
        </div>
    );
}