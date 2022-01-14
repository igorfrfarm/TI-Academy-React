import axios from "axios";
import { api } from "../../../config";
import { Alert, Container, Table } from "reactstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Produtos = () => {

    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getProdutos = async () => {
        await axios.get(api + "/produtos")
            .then((response) => {
                setData(response.data.produtos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                });
            });
    };

    const excluirProdutos = async(id) => {
        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.get(api + "/produtos/" + id + "/excluir", {headers})
        .then((response) => {
            setStatus({
                type: 'success',
                message: response.data.message
            });
            getProdutos();
        })
        .catch(() => {
            setStatus({
                type: 'error',
                message: 'Erro: Sem conexão com a API.'
            });
        });
    };

    useEffect(() => {
        getProdutos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Produtos</h1>
                    </div>
                    <div className="d-flex align-items-center p-2">
                        <Link 
                            to="/produtos/cadastrar"
                            className="btn btn-outline-primary btn-sm"
                        >
                            Cadastrar produto
                        </Link>
                    </div>                
                </div>

                <hr className="m-1" />

                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ''}
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                        <th>Produto ID</th>
                        <th className="text-center">Nome</th>
                        <th className="text-center">Descrição</th>
                        <th className="text-center">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <td className="text-center">{item.nome}</td>
                                <td className="text-center">{item.descricao}</td>
                                <td className="d-flex justify-content-center">
                                    <Link 
                                        to={"/produtos/" + item.id} 
                                        className="btn btn-outline-primary btn-sm mx-1"
                                    >
                                    Consultar
                                    </Link>
                                    <Link
                                        to={"/produtos/" + item.id + "/editar"}
                                        className="btn btn-outline-warning btn-sm mx-1"
                                    >
                                        Editar
                                    </Link>
                                    <span                                        
                                        className="btn btn-outline-danger btn-sm mx-1"
                                        onClick={() => excluirProdutos(item.id)}
                                    >
                                        Excluir
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};