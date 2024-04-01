interface Roles{
   
    [key: string]: string[]; 
}
const roles:Roles={
admin:['read','delete','update',"create"],
user:['read','update']
}
export default roles

