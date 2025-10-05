{
  let name = "block";
  name = name + " scoped"; // bruker name, ikke block
  //console.log(name); // "block scoped"
}

if (true) {
    console.log("this is another block");
}