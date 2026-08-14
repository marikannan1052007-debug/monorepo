export default function AppBackground() {
  return (
    <>
      {/* Main Background */}
      <div className="fixed inset-0 -z-50 bg-[#050816]" />

      {/* Purple Glow */}
      <div className="fixed left-[-180px] top-[-180px] -z-40 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[140px]" />

      {/* Green Glow */}
      <div className="fixed right-[-150px] top-40 -z-40 h-[450px] w-[450px] rounded-full bg-green-500/20 blur-[140px]" />

      {/* Blue Glow */}
      <div className="fixed bottom-[-200px] left-1/2 -z-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[140px]" />

      {/* Grid */}
      <div
        className="fixed inset-0 -z-30 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
    </>
  );
}