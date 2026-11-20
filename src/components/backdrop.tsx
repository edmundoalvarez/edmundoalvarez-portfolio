/** Fondo fijo: manchas de luz y grilla sutil. Decorativo. */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 -left-48 size-[480px] rounded-full bg-[radial-gradient(circle,#fff_0%,transparent_70%)] sm:size-[760px]" />
      <div className="absolute top-[45%] -right-44 size-[420px] rounded-full bg-[radial-gradient(circle,#cfcfcf_0%,transparent_70%)] sm:size-[700px]" />
      <div className="absolute -bottom-72 left-1/4 size-[520px] rounded-full bg-[radial-gradient(circle,#fff_0%,transparent_70%)] sm:size-[820px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
  );
}
