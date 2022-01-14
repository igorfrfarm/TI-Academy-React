import axios from "axios";
import { api } from "../../../config";
import { Alert, Container, Table } from "reactstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Pedido = (props) => {

    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const [id] = useState(props.match.params.id);

    const getPedido = async () => {
        await axios.get(api + "/pedidos/" + id)
            .then((response) => {
                setData(response.data.ped.pedido_itens);                            
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                });
            });
    };

    useEffect(() => {
        getPedido();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Informações do pedido</h1>
                    </div>
                    <div className="d-flex align-items-center p-2">
                        <Link
                            to="/pedidos"
                            className="btn btn-outline-success btn-sm m-2"
                        >
                            Pedidos
                        </Link>
                        <Link
                            to="/servicos"
                            className="btn btn-outline-success btn-sm m-2"
                        >
                            Serviços
                        </Link>
                    </div>
                </div>

                <hr className="m-1" />

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>Serviço ID</th>
                            <th className="text-center">Quantidade</th>
                            <th className="text-center">Valor</th>
                            <th className="text-center">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <th>{item.ServicoId}</th>
                                <td className="text-center">{item.quantidade}</td>
                                <td className="text-center">{item.valor}</td>
                                <td className="text-center">
                                    <Link
                                        to={"/servicos/" + item.ServicoId}
                                        className="btn btn-outline-primary btn-sm"
                                    >
                                        Consultar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};