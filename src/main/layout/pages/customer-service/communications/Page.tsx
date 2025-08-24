import Books from "./blocks/books";
import Communications from "./blocks/communications";
import HeadeBar from "./blocks/headeBar";
import Tickets from "./blocks/tickets";
import UsersInfo from "./blocks/usersInfo";

export default function Page() {
  return (
    <div className="flex flex-col gap-7 mt-[80px]  bg-white">
      <HeadeBar></HeadeBar>
      <div className="w-full    shadow-md !h-[calc(100vh-180px)] grid  grid-cols-4">
        <UsersInfo></UsersInfo>
        <Books></Books>
        <Tickets></Tickets>
        <Communications></Communications>
      </div>
    </div>
  );
}
