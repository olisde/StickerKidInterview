// import React from 'react';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';

// const [confirmOpen,setConfirmOpen] = useState(false)
// const [open,setOpen] = useState(true)

// <ConfirmDialog
// title="Confirm Game Details"
// open= {open}
// setOpen={false}
// onConfirm={console.log('ok')}
// >
// Are you sure you want to add this game?
// </ConfirmDialog>

// const ConfirmDialog = (props) => {
//   const { title, children, open, setOpen, onConfirm } = props;
//   return (
//     <Dialog
//       open={open}
//       onClose={() => setOpen(false)}
//       aria-labelledby="confirm-dialog"
//     >
//       <DialogTitle id="confirm-dialog">{title}</DialogTitle>
//       <DialogContent>{children}</DialogContent>
//       <DialogActions>
//         <Button
//           variant="contained"
//           onClick={() => setOpen(false)}
//           color="secondary"
//         >
//           No
//         </Button>
//         <Button
//           variant="contained"
//           onClick={() => {
//             setOpen(false);
//             onConfirm();
//           }}
//           color="default"
//         >
//           Yes
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };
// export default ConfirmDialog;