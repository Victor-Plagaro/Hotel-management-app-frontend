export default function openDialog(hotelId: number) {
  const dialogImage = document.getElementById(`dialogImage-${hotelId}`);
  const formAddImage = document.getElementById(`formImage-${hotelId}`);
  const closeButton = formAddImage?.querySelector('.close-dialog');

  if (dialogImage && formAddImage) {
    dialogImage.addEventListener('click', () => {
      (formAddImage as HTMLDialogElement).showModal();
      document.body.classList.add('no-scroll');
    });

    formAddImage.addEventListener('close', () => {
      document.body.classList.remove('no-scroll');
    });

    formAddImage.addEventListener('cancel', () => {
      document.body.classList.remove('no-scroll');
    });

    if (closeButton) {
      closeButton.addEventListener('click', () => {
        (formAddImage as HTMLDialogElement).close();
        document.body.classList.remove('no-scroll');
      });
    }
  }
}
