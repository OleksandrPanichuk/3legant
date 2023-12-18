

interface IPageProps {
    searchParams: {
        code?:string 
    }
}

export const Page = ({searchParams}:IPageProps) => {
    if(searchParams.code) {
        //Повертаємо сторінку з відновленням паролю, але спочатку верифікуємо його
        return <></>
    }
    //Повертаємо сторінкою з email формою, для відправки посилання для відновлення паролю на почту
    return <div>Page</div>;
};
