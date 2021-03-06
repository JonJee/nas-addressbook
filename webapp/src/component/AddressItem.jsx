import React from 'react';
import QRious from 'qrious';
import Blockies from 'react-blockies';
import QRCodeDialog from './QRCodeDialog';
import SendDialog from './SendDialog';
import EditNameDialog from './EditNameDialog';
import ContractDataController from '../main/datacontroller/ContractDataController';

// material-ui
import { Card, CardHeader, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import ToggleStarBorder from 'material-ui/svg-icons/toggle/star-border';

class AddressItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenQRCodeModal: false,
            isOpenSendModal: false,
            isOpenEditNameModal: false,
            qrcode: '',
        }
    }

    onQRCodeModalOpen() {
        this.setState({
            ...this.state,
            isOpenQRCodeModal: true,
        }, this.onQRCodeGenerated.bind(this));
    }

    onQRCodeModalClosed() {
        this.setState({
            ...this.state,
            isOpenQRCodeModal: false,
        });
    }

    onSendModalOpen() {
        this.setState({
            ...this.state,
            isOpenSendModal: true,
        });
    }

    onSendModalClosed() {
        this.setState({
            ...this.state,
            isOpenSendModal: false,
        });
    }

    onEditNameModalOpen() {
        this.setState({
            ...this.state,
            isOpenEditNameModal: true,
        });
    }

    onEditNameModalClosed() {
        this.setState({
            ...this.state,
            isOpenEditNameModal: false,
        });
    }

    onQRCodeGenerated() {
        var qr = new QRious({
            value: this.props.item.address,
        });
        this.setState({
            ...this.state,
            qrcode: qr.toDataURL(),
        });
    }

    onDeleteButtonClicked() {
        var args = `[\"${this.props.item.address}\"]`;
        ContractDataController.sendTransaction('0', 'delete', args, undefined, this.props.succeedListener, undefined);
    }

    onFavoriteChecked() {
        var args = `[\"${this.props.item.address}\"]`;
        ContractDataController.sendTransaction('0', 'addOrRemoveFavorite', args, undefined, this.props.succeedListener, undefined);
    }

    render() {
        const styles = {
            card: {
                margin: "15px"
            },
            button: {
                minWidth: "60px",
            },
            favoriteCheckBox: {
                display: 'inline-block',
                width: '24px',
                position: 'absolute',
                right: '20px'
            }
        }
        return (
            <div>
                <Card style={styles.card}>
                    <CardHeader
                        avatar={<Blockies
                            seed={this.props.item.address}
                            size={11}
                            scale={3}
                        />}
                        title={<div>
                            <span>{this.props.item.name}</span>
                            {this.props.myself || <Checkbox
                                checkedIcon={<ToggleStar />}
                                uncheckedIcon={<ToggleStarBorder />}
                                style={styles.favoriteCheckBox}
                                checked={this.props.item.isFavorite}
                                onCheck={this.onFavoriteChecked.bind(this)}
                            />}
                        </div>}
                        subtitle={this.props.item.address}
                        titleStyle={{ fontSize: '20px', marginLeft: '10px' }}
                        subtitleStyle={{ fontSize: '10px', marginLeft: '10px' }}
                        showExpandableButton={false}
                    />
                    <CardActions>
                        {this.props.myself || <RaisedButton style={styles.button} label="Send" backgroundColor="#00cec9" onClick={this.onSendModalOpen.bind(this)}/>}
                        <RaisedButton style={styles.button} label="QR Code" backgroundColor="#74b9ff" onClick={this.onQRCodeModalOpen.bind(this)} />
                        {this.props.myself || <RaisedButton label="Edit" style={styles.button} backgroundColor="#a29bfe" onClick={this.onEditNameModalOpen.bind(this)}/>}
                        {this.props.myself || <RaisedButton label="Delete" style={styles.button} backgroundColor="#fab1a0" onClick={this.onDeleteButtonClicked.bind(this)} />}
                    </CardActions>
                </Card>
                <QRCodeDialog isOpenModal={this.state.isOpenQRCodeModal} closeListener={this.onQRCodeModalClosed.bind(this)} qrcode={this.state.qrcode} item={this.props.item} />
                <SendDialog isOpenModal={this.state.isOpenSendModal} closeListener={this.onSendModalClosed.bind(this)} name={this.props.item.name} address={this.props.item.address} />
                <EditNameDialog isOpenModal={this.state.isOpenEditNameModal} closeListener={this.onEditNameModalClosed.bind(this)} name={this.props.item.name} address={this.props.item.address} succeedListener={this.props.succeedListener}/>
            </div>
        );
    }
}

export default AddressItem;