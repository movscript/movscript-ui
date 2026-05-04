"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from "./dialog";
import { Button } from "./button";
import { Input } from "./input";
import { cn } from "../lib/cn";

export type AuthPanelMode = "login" | "register" | "profile";
export type AuthPanelProvider = "wechat" | "google" | "github";

export interface AuthPanelValues {
  email: string;
  username: string;
  code: string;
  displayName: string;
  avatarUrl: string;
  locale: string;
}

export interface AuthPanelProps {
  open: boolean;
  mode: AuthPanelMode;
  values: AuthPanelValues;
  emailEnabled?: boolean;
  codeSent?: boolean;
  devCode?: string;
  loading?: boolean;
  error?: string;
  providers?: AuthPanelProvider[];
  brandName?: string;
  productName?: string;
  onOpenChange: (open: boolean) => void;
  onModeChange: (mode: AuthPanelMode) => void;
  onValuesChange: (values: AuthPanelValues) => void;
  onSubmitEmail: () => void;
  onSaveProfile: () => void;
  onProviderSelect: (provider: AuthPanelProvider) => void;
}

export function AuthPanel({
  open,
  mode,
  values,
  emailEnabled = false,
  codeSent = false,
  devCode,
  loading = false,
  error,
  providers = [],
  brandName = "Movscript",
  productName = "Hub",
  onOpenChange,
  onModeChange,
  onValuesChange,
  onSubmitEmail,
  onSaveProfile,
  onProviderSelect
}: AuthPanelProps) {
  const isProfile = mode === "profile";
  const isRegister = mode === "register";
  const title = isProfile ? "用户信息" : isRegister ? "创建账号" : `登录 ${brandName} ${productName}`;
  const description =
    isProfile ? "管理头像、昵称与偏好语言。" : "选择合适的方式继续访问工作区。";

  function update<K extends keyof AuthPanelValues>(key: K, value: AuthPanelValues[K]) {
    onValuesChange({ ...values, [key]: value });
  }

  function submitEmailForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmitEmail();
  }

  function submitProfileForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSaveProfile();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="ms-auth-panel" closeLabel="关闭">
        <div className="ms-auth-panel__chrome" aria-hidden="true" />
        <header className="ms-auth-panel__header">
          <div className="ms-auth-panel__brand">
            <span className="ms-auth-panel__brand-mark">{brandInitials(brandName)}</span>
            <span className="ms-auth-panel__brand-text">
              <span>{brandName}</span>
              <span>{productName}</span>
            </span>
          </div>
          <DialogTitle className="ms-auth-panel__title">{title}</DialogTitle>
          <DialogDescription className="ms-auth-panel__description">{description}</DialogDescription>
        </header>

        {isProfile ? (
          <form className="ms-auth-panel__section" onSubmit={submitProfileForm}>
            <AuthField label="显示名称">
              <Input
                value={values.displayName}
                onChange={(event) => update("displayName", event.target.value)}
                placeholder="例如 Alex Chen"
                autoComplete="name"
              />
            </AuthField>
            <AuthField label="头像 URL">
              <Input
                value={values.avatarUrl}
                onChange={(event) => update("avatarUrl", event.target.value)}
                placeholder="https://example.com/avatar.png"
                inputMode="url"
                autoComplete="url"
              />
            </AuthField>
            <AuthField label="语言区域">
              <Input
                value={values.locale}
                onChange={(event) => update("locale", event.target.value)}
                placeholder="zh-CN"
                autoComplete="language"
              />
            </AuthField>
            <AuthPanelError error={error} />
            <Button className="ms-auth-panel__submit" type="submit" loading={loading}>
              保存
            </Button>
          </form>
        ) : (
          <div className="ms-auth-panel__body">
            {emailEnabled ? (
              <form className="ms-auth-panel__section" onSubmit={submitEmailForm}>
                <div className="ms-auth-panel__segments" role="tablist" aria-label="认证模式">
                  <button
                    className="ms-auth-panel__segment"
                    type="button"
                    role="tab"
                    aria-selected={mode === "login"}
                    data-state={mode === "login" ? "active" : "inactive"}
                    onClick={() => onModeChange("login")}
                  >
                    登录
                  </button>
                  <button
                    className="ms-auth-panel__segment"
                    type="button"
                    role="tab"
                    aria-selected={isRegister}
                    data-state={isRegister ? "active" : "inactive"}
                    onClick={() => onModeChange("register")}
                  >
                    注册
                  </button>
                </div>
                {isRegister ? (
                  <AuthField label="用户名">
                    <Input
                      value={values.username}
                      onChange={(event) => update("username", event.target.value)}
                      placeholder="设置唯一用户名"
                      autoComplete="username"
                    />
                  </AuthField>
                ) : null}
                <AuthField label="邮箱地址">
                  <Input
                    value={values.email}
                    onChange={(event) => update("email", event.target.value)}
                    placeholder="name@example.com"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                  />
                </AuthField>
                {codeSent ? (
                  <AuthField label="验证码">
                    <Input
                      value={values.code}
                      onChange={(event) => update("code", event.target.value)}
                      placeholder="输入 6 位验证码"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                    />
                  </AuthField>
                ) : null}
                {devCode ? <p className="ms-auth-panel__hint">开发验证码：{devCode}</p> : null}
                <AuthPanelError error={error} />
                <Button className="ms-auth-panel__submit" type="submit" loading={loading}>
                  {codeSent ? (isRegister ? "创建账号" : "登录") : "获取验证码"}
                </Button>
              </form>
            ) : null}

            {providers.length ? (
              <div className={cn("ms-auth-panel__providers", emailEnabled && "ms-auth-panel__providers--separated")}>
                <div className="ms-auth-panel__divider">
                  <span>其他方式</span>
                </div>
                {providers.map((provider) => (
                  <Button key={provider} type="button" variant="outline" className="ms-auth-panel__provider" onClick={() => onProviderSelect(provider)}>
                    <ProviderMark provider={provider} />
                    {providerLabel(provider)}
                  </Button>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function AuthField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="ms-auth-panel__field">
      <span className="ms-auth-panel__label">{label}</span>
      {children}
    </label>
  );
}

function AuthPanelError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p className="ms-auth-panel__error" role="alert">
      {error}
    </p>
  );
}

function ProviderMark({ provider }: { provider: AuthPanelProvider }) {
  return <span className="ms-auth-panel__provider-mark">{provider === "google" ? "G" : provider === "github" ? "{}" : "微"}</span>;
}

function providerLabel(provider: AuthPanelProvider) {
  switch (provider) {
    case "google":
      return "Google 登录";
    case "github":
      return "GitHub 登录";
    case "wechat":
      return "微信登录";
  }
}

function brandInitials(brandName: string) {
  const trimmed = brandName.trim();
  if (!trimmed) return "M";
  return trimmed.slice(0, 2).toUpperCase();
}
