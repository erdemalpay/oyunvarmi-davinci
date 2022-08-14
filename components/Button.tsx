export function Button({ ...props }): JSX.Element {
  return (
    <div className="flex w-full cursor-pointer" onClick={props.onClick}>
      <div
        className={`${
          props.borderstyles ?? ""
        } w-0 h-0 border-t-transparent border-solid border-b-[28px] border-t-[28px] border-b-transparent border-r-[20px]`}
      ></div>
      <button
        className={`p-2 lg:p-4 font-germania w-full ${props.className ?? ""}`}
      >
        <div className="flex w-full justify-center items-center gap-2">
          {props.Icon && <props.Icon />}
          {props.children}
        </div>
      </button>
      <div
        className={`${
          props.borderstyles ?? ""
        } w-0 h-0 border-t-transparent border-solid border-b-[28px] border-t-[28px] border-b-transparent border-l-[20px]`}
      ></div>
    </div>
  );
}
