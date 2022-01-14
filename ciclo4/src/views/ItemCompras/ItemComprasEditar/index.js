import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { api } from "../../../config";

export const ItemComprasEditar = (props) => {

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });
    const [CompraId] = useState(props.match.params.CompraId);
    const [ProdutoId] = useState(props.match.params.ProdutoId);
    const [item, setItem] = useState({
        CompraId: '',
        ProdutoId: '',
        quantidade: '',
        valor: ''
    });

    const valorInput = e => setItem({
        ...item,
        [e.target.name]: e.target.value
    });

    const limparInput = () => setItem({
        CompraId: '',
        ProdutoId: '',
        quantidade: '',
        valor: ''
    });

    const getItem = async () => {
        await axios.get(api + "/itemcompra/" + CompraId + "/" + ProdutoId)
            .then((response) => { 
                setItem(response.data.item);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                });
            });
    };

    const editarItem = async e => {
        e.preventDefault();

        setStatus({
            formSave: true
        });

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/itemcompra/" + CompraId + "/" + ProdutoId + "/editar", item, { headers })
            .then((response) => {                
                setStatus({
                    formSave: false,
                    type: 'success',
                    message: response.data.message
                });
            })
            .catch(() => {
                setStatus({
                    formSave: false,
                    type: 'error',
                    message: "Erro: Sem conexão com a API."
                });
            });
    };

    useEffect(() => {
        getItem();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Editar Item</h1>
                    </div>
                    <div className="d-flex align-items-center p-2">
                        <Link
                            to="/itenscompras"
                            className="btn btn-outline-success btn-sm"
                        >
                            Itens
                        </Link>
                    </div>
                </div>

                <hr className="m-1" />

                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ''}
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ''}

                <Form className="p-2" onSubmit={editarItem}>
                    <FormGroup className="p-2">
                        <Label>Compra ID</Label>
                        <Input type="text" name="CompraId" placeholder="ID da Compra" value={item.CompraId} onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Produto ID</Label>
                        <Input type="text" name="ProdutoId" placeholder="ID do Produto" value={item.ProdutoId} onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Quantidade</Label>
                        <Input type="text" name="quantidade" placeholder="Quantidade" value={item.quantidade} onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Valor</Label>
                        <Input type="text" name="valor" placeholder="Valor" value={item.valor} onChange={valorInput} />
                    </FormGroup>
                    {status.formSave ? 
                        <Button type="submit" className="m-2" outline color="success" disabled>Salvando... <Spinner type="border" size="sm" color="success" children="" /></Button> :
                        <Button type="submit" className="m-2" outline color="warning">Salvar</Button>
                    }    
                    <Button type="button" className="m-2" outline color="secondary" onClick={limparInput}>Limpar</Button>
                </Form>
            </Container>
        </div>
    )
}