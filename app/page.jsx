import Wrapper from "../components/layout/Wrapper";
import MainHome from "../app/home/page";

export const metadata = {
  title: "Synergy",
  description: "Synergy - Resource allocator mapper for efficient transaction",
};

export default function Home() {
  return (
    <>
      <Wrapper>
        <MainHome />
      </Wrapper>
    </>
  );
}
