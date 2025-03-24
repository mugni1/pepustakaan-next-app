import MainContainer from "../MainContainer";

export default function LoadingTable() {
  return (
    <MainContainer>
      {/* search  */}
      <section className="w-full flex items-center justify-between mb-5">
        <div className="w-3/12 bg-slate-400 animate-pulse h-10 rounded-lg"></div>
        <div className="w-5/12 bg-slate-400 animate-pulse h-10 rounded-lg"></div>
      </section>
      {/* end search  */}
      <section className="w-full rounded-lg h-72 bg-slate-400 animate-pulse mb-5"></section>
      <section className="w-full rounded-lg h-20 bg-slate-400 animate-pulse mb-5"></section>
    </MainContainer>
  );
}
