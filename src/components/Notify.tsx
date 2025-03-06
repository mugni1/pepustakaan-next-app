export function NotifyError(props: {
  isNotify: boolean;
  message: string;
  statusCode: number;
}) {
  return (
    <div
      className={`py-2 px-5 rounded-lg border absolute top-5 right-5 w-60  transition-all duration-500 ease-in-out  ${
        props.statusCode == 200 ? "text-emerald-500" : "text-red-500"
      } ${
        props.isNotify ? "visible translate-x-0" : "invisible translate-x-80"
      }`}
    >
      <h4 className="font-semibold flex gap-1">
        {props.statusCode == 200 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <span>{props.statusCode == 200 ? "SUCCESS" : "ERROR"}</span>
      </h4>
      <p className="text-xs">{props.message}</p>
    </div>
  );
}
