import { Button } from "@/components/@ui/Button";
import { FileInput } from "@/components/@ui/FileInput";
import { Text } from "@/components/@ui/Text";
import { Title } from "@/components/@ui/Title";
import { ArrowsClockwise } from "@phosphor-icons/react";
import { ErrorMessage, Field, Section } from "./styles";
import { useEffect, useRef, useState } from "react";
import { updateProfileImage } from "@/api/update-profile-image";
import { toast } from "sonner";
import { Spinner } from "@/components/Spinner";
import { updateBannerImage } from "@/api/update-banner-image";

export function UpdateImages() {
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isBannerLoading, setIsBannerLoading] = useState(false);

  const [profileImage, setProfileImage] = useState<File>();
  const [bannerImage, setBannerImage] = useState<File>();

  const [profileKey, setProfileKey] = useState(0);
  const [bannerKey, setBannerKey] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");

  async function handleUpdateProfileImage() {
    try {
      if (profileImage) {
        setIsProfileLoading(true);
        await updateProfileImage(profileImage);

        // remove o arquivo do input (forca um re-render e o input perde o arquivo)
        setProfileImage(undefined);
        setProfileKey((prev) => prev + 1);

        toast.success("Imagem de perfil atualizada com sucesso!");
      } else {
        setErrorMessage("Selecione uma imagem de perfil antes de atualizar");
      }
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error("Erro ao atualizar imagem de perfil!", {
          description: error.response.data.message,
        });
        return;
      }
      toast.error("Erro ao atualizar imagem de perfil!", {
        description:
          "Não foi possível atualizar a imagem de perfil, tente novamente mais tarde.",
      });
    } finally {
      setIsProfileLoading(false);
    }
  }

  async function handleUpdateBannerImage() {
    try {
      if (bannerImage) {
        setIsBannerLoading(true);
        await updateBannerImage(bannerImage);

        // remove o arquivo do input (forca um re-render e o input perde o arquivo)
        setBannerImage(undefined);
        setBannerKey((prev) => prev + 1);

        toast.success("Imagem de banner atualizada com sucesso!");
      } else {
        setErrorMessage("Selecione uma imagem de banner antes de atualizar");
      }
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error("Erro ao atualizar imagem de banner!", {
          description: error.response.data.message,
        });
        return;
      }
      toast.error("Erro ao atualizar imagem de banner!", {
        description:
          "Não foi possível atualizar a imagem de banner, tente novamente mais tarde.",
      });
    } finally {
      setIsBannerLoading(false);
    }
  }

  useEffect(() => {
    if (profileImage || bannerImage) {
      setErrorMessage("");
    }
  }, [profileImage, bannerImage]);

  return (
    <Section>
      <Title size="sm">Imagens</Title>

      <div>
        <Field>
          <Text type="label" size="sm">
            Perfil
          </Text>
          <div>
            <FileInput
              key={profileKey}
              title="Imagem"
              contentSize="sm"
              isMultiple={false}
              onChange={(event) => setProfileImage(event.target.files?.[0])}
            />
            <Button
              disabled={isProfileLoading}
              size="sm"
              onClick={handleUpdateProfileImage}
            >
              {!isProfileLoading ? (
                <>
                  <ArrowsClockwise weight="bold" />
                </>
              ) : (
                <Spinner color="#FFF6D8" />
              )}
            </Button>
          </div>
        </Field>

        <Field>
          <Text type="label" size="sm">
            Banner
          </Text>
          <div>
            <FileInput
              key={bannerKey}
              title="Imagem"
              contentSize="sm"
              isMultiple={false}
              onChange={(event) => setBannerImage(event.target.files?.[0])}
            />
            <Button
              disabled={isBannerLoading}
              size="sm"
              onClick={handleUpdateBannerImage}
            >
              {!isBannerLoading ? (
                <>
                  <ArrowsClockwise weight="bold" />
                </>
              ) : (
                <Spinner color="#FFF6D8" />
              )}
            </Button>
          </div>
        </Field>
      </div>

      <ErrorMessage>{errorMessage}</ErrorMessage>
    </Section>
  );
}
