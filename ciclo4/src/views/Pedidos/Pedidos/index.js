import axios from "axios";
import { api } from "../../../config";
import { Alert, Container, Table } from "reactstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Pedidos = () => {

    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getPedidos = async () => {
        await axios.get(api + "/pedidos")
            .then((response) => {
                setData(response.data.pedidos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                });
            });
    };

    const excluirPedido = async(id) => {
        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.get(api + "/pedidos/" + id + "/excluir", {headers})
        .then((response) => {
            setStatus({
                type: 'success',
                message: response.data.message
            });
            getPedidos();
        })
        .catch(() => {
            setStatus({
                type: 'error',
                message: 'Erro: Sem conexão com a API.'
            });
        });
    };

    useEffect(() => {
        getPedidos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Pedidos</h1>
                    </div>
                    <div className="d-flex align-items-center p-2">
                        <Link
                            to="/pedidos/cadastrar"
                            className="btn btn-outline-primary btn-sm"
                        >
                            Cadastrar pedido
                        </Link>
                    </div>
                </div>

                <hr className="m-1" />
                
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ''}
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>Pedido ID</th>
                            <th className="text-center">Cliente ID</th>
                            <th className="text-center">Data</th>
                            <th className="text-center">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <td className="text-center">{item.ClienteId}</td>
                                <td className="text-center">{item.data}</td>
                                <td className="d-flex justify-content-center">
                                    <Link
                                        to={"/pedidos/" + item.id}
                                        className="btn btn-outline-primary btn-sm mx-1"
                                    >
                                        Consultar
                                    </Link>
                                    <Link
                                        to={"/pedidos/" + item.id + "/editar"}
                                        className="btn btn-outline-warning btn-sm mx-1"
                                    >
                                        Editar
                                    </Link>
                                    <span                                        
                                        className="btn btn-outline-danger btn-sm mx-1"
                                        onClick={() => excluirPedido(item.id)}
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