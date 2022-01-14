import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { api } from "../../../config";

export const ProdutoEditar = (props) => {

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });
    const [ProdutoId] = useState(props.match.params.id);
    const [produto, setProduto] = useState({
        nome: '',
        descricao: ''
    });

    const valorInput = e => setProduto({
        ...produto,
        [e.target.name]: e.target.value
    });

    const limparInput = () => setProduto({
        nome: '',
        descricao: ''
    });

    const getProduto = async () => {
        await axios.get(api + "/produtos/" + ProdutoId)
            .then((response) => {
                setProduto(response.data.prod);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                });
            });
    };

    const editarProduto = async e => {
        e.preventDefault();

        setStatus({
            formSave: true
        });

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/produtos/" + ProdutoId + "/editar", produto, { headers })
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
                    message: 'Erro: Sem conexão com a API.'
                });
            });
    };

    useEffect(() => {
        getProduto();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Editar Produtos</h1>
                    </div>
                    <div className="d-flex align-items-center p-2">
                        <Link
                            to="/produtos"
                            className="btn btn-outline-success btn-sm"
                        >
                            Produtos
                        </Link>
                    </div>
                </div>

                <hr className="m-1" />

                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ''}
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ''}

                <Form className="p-2" onSubmit={editarProduto}>
                    <FormGroup className="p-2">
                        <Label>Produto ID</Label>
                        <Input type="text" name="ProdutoId" placeholder="ID do produto" value={produto.id} onChange={valorInput} disabled />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input type="text" name="nome" placeholder="Nome do produto" value={produto.nome} onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Descrição</Label>
                        <Input type="text" name="descricao" placeholder="Descrição do produto" value={produto.descricao} onChange={valorInput} />
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