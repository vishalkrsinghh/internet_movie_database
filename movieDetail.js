let getLocalDetail = JSON.parse(localStorage.arr2);
// console.log(JSON.parse(localStorage.arr2))



let cont = document.getElementsByClassName("container")[0];
// console.log(Object.keys(getLocalDetail[0]).length);
if(Object.keys(getLocalDetail[0]).length==4){
  cont.innerHTML = ` 
       <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0" style="align-items: center;">
      <div class="col-md-4">
        <img src="${getLocalDetail[0].Poster}" class="img-fluid rounded-start imgf" alt="..." height="100%">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <p class="card-title"> <b> Movie name:- </b><span> ${getLocalDetail[0].Title}</span></p>
          <p class="card-text"><b> Type:- </b> ${getLocalDetail[0].Type}.</p>
          <p class="card-text"><small class="text-body-secondary"><b> Released Year:- </b>${getLocalDetail[0].Year}</small></p>
        </div>
      </div>
    </div>
  </div> `;
}
else{

  cont.innerHTML = ` 
         <div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0" style="align-items: center;">
        <div class="col-md-4">
          <img src="${getLocalDetail[0].Poster}" class="img-fluid rounded-start imgf" alt="..." height="100%">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <p class="card-title"> <b> Movie name:- </b><span> ${getLocalDetail[0].Title}</span></p>
            <p class="card-text"><b> Movie details:- </b> ${getLocalDetail[0].Plot}.</p>
            <p class="card-title"> <b> Language:- </b><span> ${getLocalDetail[0].Language}</span></p>
            <p class="card-title"> <b> Country:- </b><span> ${getLocalDetail[0].Country}</span></p>
            <p class="card-title"> <b> Awards:- </b><span> ${getLocalDetail[0].Awards}</span></p>
            <p class="card-title"> <b> Writer:- </b><span> ${getLocalDetail[0].Writer}</span></p>
            <p class="card-title"> <b> Director:- </b><span> ${getLocalDetail[0].Director}</span></p>
            <p class="card-title"> <b> Actors:- </b><span> ${getLocalDetail[0].Actors}</span></p>
            <p class="card-title"> <b> Duration:- </b><span> ${getLocalDetail[0].Duration}</span></p>
            <p class="card-text"><small class="text-body-secondary"><b> Released date:- </b>${getLocalDetail[0].Released}</small></p>
          </div>
        </div>
      </div>
    </div> `;
}