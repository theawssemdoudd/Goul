import DateAgo from "@/components/DateAgo";

const Page = () => {
  return <h1>Home <DateAgo date={new Date()}/></h1>;
}

export default Page;
