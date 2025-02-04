export default function Error404() {
  return (
    <div className="mt-20">
      <div className="flex flex-col items-center justify-center h-[95%]">
        <div className="mb-10">
          <img
            alt="image"
            className="dark:hidden max-h-[250px]"
            src="/404.svg"
          />
        </div>
        <span className="badge badge-primary badge-outline mb-3">
          404 Error
        </span>
        <h3 className="text-2.5xl font-semibold text-gray-900 text-center mb-2">
          We have lost this page
        </h3>
        <div className="text-md text-center text-gray-700 mb-10">
          The requested page is missing. Check the URL or&nbsp;
          <a
            className="text-primary font-medium hover:text-primary-active"
            href="/metronic/tailwind/demo1/"
          >
            Return Home
          </a>
          .
        </div>
      </div>
    </div>
  );
}
