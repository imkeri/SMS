
  export  function validate1(){
    if(document.test_form.stud_name.value === "")
    {
        alert("please enter a student name");
         document.test_form.stud_name.focus();
          return false;
    }
    if(document.test_form.stud_name.value.match(/^[a-zA-Z]+$/))
    {

    }
    else
    {
        alert("please enter only alpha  in student name");
     document.test_form.stud_name.focus();
      return false;
    }
    if(document.test_form.father_name.value === "")
    {
        alert("please enter a father name");
         document.test_form.father_name.focus();
          return false;
    }
    if(document.test_form.father_name.value.match(/^[a-zA-Z]+$/))
    {

    }
    else
    {
        alert("please enter only alpha  in father name");
     document.test_form.mother_name.focus();
      return false;
    }
    if(document.test_form.mother_name.value === "")
    {
        alert("please enter a father name");
         document.test_form.mother_name.focus();
          return false;
    }
    if(document.test_form.mother_name.value.match(/^[a-zA-Z]+$/))
    {

    }
    else
    {
        alert("please enter only alpha in mother name");
     document.test_form.mother_name.focus();
      return false;
    }
    if(document.test_form.foccu.value === "")
    {
        alert("please enter a father occupation");
         document.test_form.foccu.focus();
          return false;
    }
    if(document.test_form.moccu.value === "")
    {
        alert("please enter a mother occupation");
         document.test_form.moccu.focus();
          return false;
    }
    if(document.test_form.email.value === "")
    {
        alert("please enter a email");
         document.test_form.email.focus();
          return false;
    }
    if(document.test_form.email.value.match(/^[a-zA-Z0-9_]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/))
    {

    }
    else
      {   
        alert("please enter valid email");
         document.test_form.email.focus();
          return false;
    }
    if(document.test_form.mobile.value === "")
    {
          alert("please enter mobile number");
         document.test_form.mobile.focus();
          return false;
    }
   
    if(isNaN(document.test_form.mobile.value))
    {
        alert("please enter only digite");
         document.test_form.mobile.focus();
          return false;
    }
    if(document.test_form.mobile.value.length !== 10)
    {
          alert("please enter 10 digite");
         document.test_form.mobile.focus();
          return false;
    }
    if(document.test_form.city.value === "")
    {
        alert("please enter your city");
         document.test_form.city.focus();
          return false;
    }
    
    
    
}