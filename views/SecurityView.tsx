import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { useState } from "react";

interface RoleColorType {
    color: string,
    bgColor: string,
}

export default function SecurityView() {
    const roleColors: RoleColorType[] = [
        {color: "#1E40AF", bgColor: "#DBEAFE"},
        {color: "#166534", bgColor: "#DCFCE7"},
        {color: "#6B21A8", bgColor: "#F3E8FF"}
    ]

    const [newRoleName, setNewRoleName] = useState("");
    const [newRoleNameError, setNewRoleNameError] = useState("");
    const [newRoleIndex, setNewRoleIndex] = useState(0);

    const [roles, setRoles] = useState<string[]>([]);
    const [rolesData, setRolesData] = useState<Record<string, RoleColorType>>({});

    function addRole(newRoleName: string) {
        if (newRoleName == "") {
            setNewRoleNameError("O nome da nova função não pode ser vazio.")
            return;
        }
        setNewRoleNameError("");

        setRoles([
            ... roles,
            newRoleName
        ]);

        setRolesData({
            ... rolesData,
            [newRoleName]: {
                ... roleColors[newRoleIndex % roleColors.length]
            }
        });

        setNewRoleName("");
        setNewRoleIndex(newRoleIndex + 1);
    }

    return (
        <div className="w-full min-h-screen bg-[#F9FAFB] flex justify-center pt-[40px] px-4 pb-4">
            <div className="max-w-[1000px] bg-white flex h-fit border border-[#E5E7EB] p-4 pb-8 flex-col gap-[48px]">
                <Header
                    title="Segurança de Endpoints"
                    description="Defina suas funções (roles) e, em seguida, adicione-as ou remova-as de cada permissão de endpoint."
                />

                <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[8px]">
                    <div className="flex gap-2 flex-wrap">
                        {
                            roles.map((item, index) => {
                                return (
                                    
                                    <Button
                                        key={index}
                                        name={item}
                                        color={rolesData[item].color}
                                        bg={rolesData[item].bgColor}
                                        borderColor={""}
                                        px="px-[9px]"
                                        py="py-[4px]"
                                        borderRadius={8}
                                        onClick={() => {
                                            
                                        }}/>
                                )
                            })
                        }
                    </div>

                    <div className="flex gap-2 items-start">
                        <div className="w-[192px] h-9">
                            <Input
                                placeHolder={"Adicionar nova função"}
                                value={newRoleName}
                                error={newRoleNameError}
                                changeValue={(e: string) => {
                                    setNewRoleName(e)
                                }}
                                bgColor="bg-white"
                                rounded="rounded-[6px]"
                            />
                        </div>
                        <Button
                            name={"Adicionar"}
                            color={"#fff"}
                            bg={"#3B82F6"}
                            px={"px-[16px]"}
                            py={"py-[9px]"}
                            borderColor={""}
                            onClick={() => {
                                addRole(newRoleName);
                            }}/>
                    </div>
                </div>
            </div>
        </div>
    )
}