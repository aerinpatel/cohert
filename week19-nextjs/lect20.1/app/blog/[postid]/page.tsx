import axios from "axios";

export default async function BlogPage({params}){
    const resolvedParams = (await params).postid;
    console.log(resolvedParams);
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos/'+resolvedParams);
    const todo = res.data;
    return <div>
        <h1 className="text-2xl font-bold">Blog Page: {todo.title}</h1>
    </div>
}




/////////////////// now static site generation

export function getServerSideProps(){

}
export function getStaticProps(){
    
}