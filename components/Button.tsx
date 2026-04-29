export function Button({ ...props }): JSX.Element {
  return (
    <div className="flex w-full cursor-pointer" onClick={props.onClick}>
      <button
        className={`w-full rounded-full px-5 py-3.5 md:py-4 font-body font-semibold tracking-[0.01em] transition-all duration-200 hover:-translate-y-0.5 ${props.className ?? ""}`}
      >
        <div className="flex w-full justify-center items-center gap-2">
          {props.Icon && <props.Icon />}
          {props.children}
        </div>
      </button>
    </div>
  );
}
