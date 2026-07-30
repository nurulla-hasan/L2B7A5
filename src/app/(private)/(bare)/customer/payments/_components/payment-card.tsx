import { CalendarCheck, CreditCard, Hash, CheckCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate, formatPrice, timeAgo } from "@/lib/utils";
import { PAYMENT_STATUS_VARIANT, PAYMENT_STATUS_LABEL } from "@/interface/payment";
import type { Payment } from "@/interface/payment";

export function PaymentCard({ payment }: { payment: Payment }) {
  const serviceName = payment.booking?.service.name;
  const scheduleDate = payment.booking?.scheduleDate;

  return (
    <Card className="transition-shadow hover:shadow-md group">
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 space-y-2">
            {/* Status + Time */}
            <div className="flex items-center gap-3">
              <Badge variant={PAYMENT_STATUS_VARIANT[payment.status]}>
                {PAYMENT_STATUS_LABEL[payment.status]}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {timeAgo(payment.createdAt)}
              </span>
            </div>

            {/* Service Name */}
            {serviceName && (
              <p className="font-medium">{serviceName}</p>
            )}

            {/* Details */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CreditCard className="size-3.5" />
                {formatPrice(payment.amount)}
              </span>
              {scheduleDate && (
                <span className="flex items-center gap-1.5">
                  <CalendarCheck className="size-3.5" />
                  {formatDate(scheduleDate)}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Hash className="size-3.5" />
                {payment.transactionId}
              </span>
              {payment.paidAt && (
                <span className="flex items-center gap-1.5 text-success">
                  <CheckCircle className="size-3.5" />
                  Paid {timeAgo(payment.paidAt)}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
