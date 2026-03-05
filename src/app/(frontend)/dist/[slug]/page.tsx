export default async function Page(props:{
    params: Promise<{ slug:string }>
}){
    const slug = (await props.params).slug
    return `Shop Distribution Page of ${slug}`
}