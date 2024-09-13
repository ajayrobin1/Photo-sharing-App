

export default function AgeModal(props) {
  const ageVer = localStorage.getItem('age-verification');
  function handleYes(){
      localStorage.setItem('age-verification', true);
  }
if(ageVer)
  return(<></>)
else
   return (
      <>
<div class="modal static" data-bs-backdrop="static" data-bs-keyboard="false" id="ageModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header pb-0">
        <h5 class="modal-title">Warning</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" >
        </button>
      </div>
      <div class="modal-body py-0">
        <p className="m-0">
        This site contains mature content.<br/>
        By accessing it, you confirm you are of legal age.
        </p>
      </div>
      <div class="modal-footer justify-content-center">
        <button type="button" class="btn btn-outline-dark mx-1" data-bs-dismiss="modal" onClick={handleYes}>Ok</button>
      </div>
    </div>
  </div>
</div>
        </>
  );
}
