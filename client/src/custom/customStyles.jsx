// Constants for custom styles in the project
const customStyles = {
    // Styles shared between Auth.jsx and forms
    h1: 'm-0 text-2xl font-bold',
    input: 'bg-[#eee] border-none py-3 px-4 w-full my-2 mx-0 rounded-md focus:outline-primary',
    form: 'flex flex-col items-center justify-center py-0 px-[50px] h-full text-center',
    button: 'rounded-[20px] border border-solid border-primary_h bg-primary text-white font-bold text-xs py-3 px-11 tracking-[1px] uppercase transition-transform duration-75 ease-in focus:outline-none active:scale-95',
    error: 'm-0 text-xs text-red-600',
    // Styles used in Admin.jsx
    link: 'flex items-center gap-4 p-2 rounded-lg hover:bg-blue-950',
    activeLink: 'bg-blue-950',
    span: 'hidden lg:block',
    // Styles used in Admin/Clients.jsx
    th: 'p-2',
    td: 'p-2 border border-gray-200 text-center overflow-x-auto max-w-[100px] overflow-y-auto max-h-[10px] whitespace-nowrap',
};

export default customStyles;