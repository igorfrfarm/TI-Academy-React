import axios from "axios";
import { api } from "../../../config";
import { Alert, Container, Table } from "reactstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ItemPedidos = () => {

    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItensPedidos = async () => {
        await axios.get(api + "/itempedido")
            .then((response) => {
                setData(response.data.itens);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                });
            });
    };

    const excluirItemPedido = async (PedidoId, ServicoId) => {

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.get(api + "/itempedido/" + PedidoId + "/" + ServicoId + "/excluir", { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: response.data.message
                });
                getItensPedidos();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                });
            });
    };

    useEffect(() => {
        getItensPedidos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Itens dos pedidos</h1>
                    </div>
                    <div className="d-flex align-items-center p-2">
                        <Link
                            to="/itenspedidos/cadastrar"
                            className="btn btn-outline-primary btn-sm"
                        >
                            Cadastrar item
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
                            <th className="text-center">Serviço ID</th>
                            <th className="text-center">Quantidade</th>
                            <th className="text-center">Valor</th>
                            <th className="text-center">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <th>{item.PedidoId}</th>
                                <td className="text-center">{item.ServicoId}</td>
                                <td className="text-center">{item.quantidade}</td>
                                <td className="text-center">{item.valor}</td>
                                <td className="d-flex justify-content-center">
                                    <Link
                                        to={"/itenspedidos/" + item.PedidoId + "/" + item.ServicoId}
                                        className="btn btn-outline-primary btn-sm mx-1"
                                    >
                                        Consultar
                                    </Link>
                                    <Link
                                        to={"/itenspedidos/" + item.PedidoId + "/" + item.ServicoId + "/editar"}
                                        className="btn btn-outline-warning btn-sm mx-1"
                                    >
                                        Editar
                                    </Link>
                                    <span
                                        className="btn btn-outline-danger btn-sm mx-1"
                                        onClick={() => excluirItemPedido(item.PedidoId, item.ServicoId)}
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