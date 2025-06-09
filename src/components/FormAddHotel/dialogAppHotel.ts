export default function openDialog() {
  const dialogHotel = document.getElementById('dialogHotel');
  const formAddHotel = document.getElementById('formHotel');
  const closeButton = formAddHotel?.querySelector('.close-dialog');

  if (dialogHotel && formAddHotel) {
    dialogHotel.addEventListener('click', () => {
      (formAddHotel as HTMLDialogElement).showModal();
      document.body.classList.add('no-scroll');
    });

    formAddHotel.addEventListener('close', () => {
      document.body.classList.remove('no-scroll');
    });

    formAddHotel.addEventListener('cancel', () => {
      document.body.classList.remove('no-scroll');
    });

    if (closeButton) {
      closeButton.addEventListener('click', () => {
        (formAddHotel as HTMLDialogElement).close();
        document.body.classList.remove('no-scroll');
      });
    }
  }
}
