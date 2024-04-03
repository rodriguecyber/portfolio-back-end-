interface Roles{
   
    [key: string]: string[]; 
}
const roles:Roles={
admin:['read','delete','update',"write"],
user:['read','update']
}
export default roles

