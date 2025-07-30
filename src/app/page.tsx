import ContentInput from "@/components/ContentInput";
import ListItem from "@/components/ListItem";

export default function Home() {
  return (
      <div className={"flex justify-center bg-gray-900 h-screen"}>
          <div className={"p-4 w-1/2"}>
              <div className={"text-5xl mt-4 text-gray-100 font-bold"}>Language Learning Helper</div>
              <ContentInput/>
              <ListItem index={"1/1"} lang1={"I ensure clear communication through regular sync meetings and shared documentation, like API specs in Swagger or Confluence."} lang2={"我通过定期的同步会议和共享文档（如Swagger或Confluence中的API规范）来确保清晰的沟通。"}/>
          </div>
      </div>
  );
}
