function NotFound() {
    return (
        <div>
            <div className="flex flex-col items-center justify-center h-[93vh] ">
                <h1 className="text-4xl font-bold text-red-600">404 - Not Found</h1>
                <p className="text-lg text-gray-600">
                    Sorry, the page you are looking for does not exist.
                </p>
            </div>
        </div>
    );
}

export default NotFound;