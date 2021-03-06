import React from 'react';

// material-ui
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class QRCodeDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const actions = [
            <FlatButton
                label="Close"
                secondary={true}
                onClick={this.props.closeListener}
            />,
        ];
        return (
            <Dialog
                title={`${this.props.item.name}'s QR Code`}
                actions={actions}
                modal={false}
                open={this.props.isOpenModal}
                onRequestClose={this.props.closeListener}
                bodyStyle={{ textAlign: 'center' }}
                contentStyle={{ maxWidth: '300px' }}>
                <span style={{ fontSize: '12px'}}>{this.props.item.address}</span>
                <br />
                <img src={this.props.qrcode} />
            </Dialog>
        );
    }
}

export default QRCodeDialog;
