import { Header } from "@/components/header";
import { Text } from "@/components/@ui/Text";
import { Container, Main, LeftColumn, RightColumn, Section } from "./styles";
import { Clock, IdentificationCard, MapPin, Star, CaretRight } from "@phosphor-icons/react";
import { Title } from "@/components/@ui/Title";
import { Card } from "@/components/@ui/Card";

export default function Store() {
  return (
    <Container>
      <Header
        title="Perfil"
        description="Essa é a área do seu perfil, aqui você pode adicionar e alterar informações do seu brechó."
      />

      <Main>
        <LeftColumn
          style={{
            borderRight: "1px solid #E3DBBD",
            paddingRight: "12px"
          }}
        >
          <Card
            css={{
              width: "100%",
              backgroundColor: "#E3DBBD",
            }}
          >
            <Text size="sm" css={{ textAlign: "center" }}>
              ESTA É UMA <strong>PRÉ-VISUALIZAÇÃO</strong> DE COMO OS <strong>CLIENTES</strong> VERÃO O <strong>PERFIL DO BRECHÓ</strong>
            </Text>
          </Card>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Title>
              Brechó Esportes
            </Title>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Text size="md" weight="bold" css={{ color: "#A19B87" }}>
                Todos os públicos
              </Text>

              <span style={{ color: "#E3DBBD" }}>●</span>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#FFF",
                  border: "1px solid #E3DBBD",
                  padding: "4px 8px",
                  borderRadius: 20,
                  width: "80px",
                  gap: 4,
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Star size={18} weight="fill" color="#F1B04E" />
                <Text size="md" css={{ color: "#F1B04E" }}>
                  4,9
                </Text>
              </div>

              <Text size="md" weight="bold" css={{ color: "#A19B87" }}>
                432 avaliações
              </Text>
            </div>
          </div>

          <div
            style={{
              height: "1px",
              backgroundColor: "#E3DBBD",
              width: "100%",
            }}
          />

          <Section>
            <Text size="lg" weight="bold" css={{ marginBottom: "$2" }}>
              Descrição
            </Text>
            <Text size="md" css={{ color: "#827E6D" }}>
              Brechó Esportes: onde estilo e sustentabilidade se encontram! <br />
              Descubra roupas e acessórios esportivos com história e <br />
              personalidade, perfeitos para você que busca moda.
            </Text>
          </Section>

          <Section>
            <Text size="lg" weight="bold" css={{ marginBottom: "$2" }}>
              Horário de atendimento
            </Text>

            <ul>
              {[
                "Segunda-feira",
                "Terça-feira",
                "Quarta-feira",
                "Quinta-feira",
                "Sexta-feira",
                "Sábado",
                "Domingo",
              ].map((dia, i) => (
                <li
                  key={dia}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "15px",
                    marginBottom: 4,
                    color: "#827E6D",
                    gap: "16px",
                  }}
                >
                  <span>{dia}</span>
                  <span style={{ fontWeight: "bold", color: "#A19B87" }}>
                    {i < 5 ? "8:00 - 18:00" : "FECHADO"}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          <Section>
            <Text size="lg" weight="bold" css={{ marginBottom: "$2" }}>
              Endereço
            </Text>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <MapPin size={32} weight="fill" color="#666256" />
              <Text size="md" css={{ color: "#827E6D" }}>
                Avenida Pequeno Príncipe, 123<br />
                Campeche, Florianópolis - SC<br />
                <strong>CEP:</strong> 12345-000
              </Text>
            </div>
          </Section>

          <Section>
            <Text size="lg" weight="bold" css={{ marginBottom: "$2" }}>
              Outras informações
            </Text>
            <Text size="md" css={{ color: "#827E6D" }}>
              <strong>Contato:</strong> (48) 91234-5678<br />
              <strong>CNPJ:</strong> 12.345.678/0001-23
            </Text>
          </Section>
        </LeftColumn>

        <RightColumn>
          <Section>
            <Title css={{ marginBottom: "$5" }}>
              Editar informações
            </Title>

            <Card title="Informações gerais" css={{ width: "100%", marginBottom: "$3" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <IdentificationCard size={32} color="#4F4C42" />

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text weight="bold">
                    Informações gerais
                  </Text>
                  <Text size="md">
                    Nome, email, telefone, imagens e outras informações
                  </Text>
                </div>
                <CaretRight size={30} color="#4F4C42" style={{ marginLeft: "auto" }} />
              </div>
            </Card>

            <Card title="Endereço" css={{ width: "100%", marginBottom: "$3" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <MapPin size={32} color="#4F4C42" />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text weight="bold">
                    Endereço
                  </Text>
                  <Text size="md">
                    Número, CEP, rua, bairro e cidade
                  </Text>
                </div>
                <CaretRight size={30} color="#4F4C42" style={{ marginLeft: "auto" }} />
              </div>
            </Card>

            <Card title="Horário de atendimento" css={{ width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Clock size={32} color="#4F4C42" />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text weight="bold">
                    Horário de atendimento
                  </Text>
                  <Text size="md">
                    Dias da semana e horário de funcionamento
                  </Text>
                </div>
                <CaretRight size={30} color="#4F4C42" style={{ marginLeft: "auto" }} />
              </div>
            </Card>
          </Section>
        </RightColumn>
      </Main>
    </Container>
  );
}
